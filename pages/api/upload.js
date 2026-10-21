import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Missing Google credentials in environment variables');
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    maxFileSize: 500 * 1024 * 1024,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Gagal membaca file: ' + err.message });
    }

    const fileArray = files.file;
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

    if (!file) {
      return res.status(400).json({ error: 'Tidak ada file yang dikirim' });
    }

    let fileStream;
    try {
      const auth = getAuth();
      const drive = google.drive({ version: 'v3', auth });

      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || null;
      const requestBody = {
        name: file.originalFilename || file.newFilename || 'untitled',
      };
      if (folderId) requestBody.parents = [folderId];

      fileStream = fs.createReadStream(file.filepath);

      const uploaded = await drive.files.create({
        requestBody,
        media: {
          mimeType: file.mimetype || 'application/octet-stream',
          body: fileStream,
        },
        fields: 'id, name, size, mimeType',
      });

      const fileId = uploaded.data.id;

      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const fileData = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink',
      });

      try { fs.unlinkSync(file.filepath); } catch {}

      const sizeInMB = file.size ? (file.size / 1024 / 1024).toFixed(2) : '?';

      return res.status(200).json({
        success: true,
        id: fileId,
        name: uploaded.data.name,
        mimeType: uploaded.data.mimeType,
        size: `${sizeInMB} MB`,
        viewLink: fileData.data.webViewLink,
        downloadLink: fileData.data.webContentLink,
        directLink: `https://drive.google.com/uc?export=view&id=${fileId}`,
        embedLink: `https://drive.google.com/file/d/${fileId}/preview`,
      });

    } catch (error) {
      try { if (fileStream) fileStream.destroy(); } catch {}
      try { fs.unlinkSync(file.filepath); } catch {}
      return res.status(500).json({
        error: error.message || 'Terjadi kesalahan saat upload ke Drive',
      });
    }
  });
        }
