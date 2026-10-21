import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';

const ICON = {
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  drive: (
    <svg viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H4.55c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
      <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L4.55 43.55c0 .05-.05.1-.05.2h27.45z" fill="#00AC47"/>
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.2c.8-1.4 1.2-2.95 1.2-4.5H59.85l5.65 10.35z" fill="#EA4335"/>
      <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832D"/>
      <path d="M59.85 53.05H27.45L13.7 76.85c1.35.8 2.9 1.2 4.5 1.2h50.6c1.6 0 3.15-.4 4.5-1.2z" fill="#2684FC"/>
      <path d="M73.4 26.8l-11-19.05c-.8-1.4-1.95-2.5-3.3-3.3L45.85 25l13.75 23.8 27.45.2c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  embed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  zip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6M12 12v2M12 16v2M10 12h4M10 16h4"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  spinner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 76 65" fill="currentColor">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

function getFileIcon(mimeType, name) {
  if (!mimeType && !name) return ICON.file;
  const m = (mimeType || '').toLowerCase();
  const ext = (name || '').split('.').pop().toLowerCase();
  if (m.startsWith('image/')) return ICON.image;
  if (m.startsWith('video/')) return ICON.video;
  if (['zip','rar','7z','gz','tar'].includes(ext)) return ICON.zip;
  return ICON.file;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={handle} className={`copy-btn ${copied ? 'copied' : ''}`} title="Salin link">
      <span className="icon">{copied ? ICON.check : ICON.copy}</span>
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  );
}

function LinkRow({ icon, label, href, value }) {
  return (
    <div className="link-row">
      <span className="link-icon">{icon}</span>
      <div className="link-content">
        <span className="link-label">{label}</span>
        <a href={href} target="_blank" rel="noreferrer" className="link-value">{value}</a>
      </div>
      <CopyButton text={value} />
    </div>
  );
}

export default function Home() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef();

  const uploadFile = useCallback(async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    setResult(null);
    setProgress(0);

    const fd = new FormData();
    fd.append('file', file);

    const fakeProgress = setInterval(() => {
      setProgress(p => p < 85 ? p + Math.random() * 12 : p);
    }, 300);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      clearInterval(fakeProgress);
      setProgress(100);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload gagal');
      setResult(data);
      setHistory(h => [data, ...h].slice(0, 10));
    } catch (e) {
      clearInterval(fakeProgress);
      setError(e.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onFileChange = (e) => { if (e.target.files[0]) uploadFile(e.target.files[0]); };

  const reset = () => { setResult(null); setError(''); if (inputRef.current) inputRef.current.value = ''; };

  return (
    <>
      <Head>
        <title>Drive Uploader — Auto Public</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☁️</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* Header */}
        <header className="header">
          <div className="header-inner">
            <div className="brand">
              <span className="brand-drive">{ICON.drive}</span>
              <span className="brand-text">DriveUp</span>
            </div>
            <nav className="header-badges">
              <span className="badge"><span className="badge-icon">{ICON.globe}</span>Auto Public</span>
              <span className="badge"><span className="badge-icon">{ICON.lock}</span>Service Account</span>
            </nav>
          </div>
        </header>

        <main className="main">
          {/* Hero */}
          <section className="hero">
            <div className="hero-icons">
              <span className="hero-icon">{ICON.drive}</span>
              <span className="hero-arrow">→</span>
              <span className="hero-icon small">{ICON.globe}</span>
            </div>
            <h1 className="hero-title">Upload ke Google Drive,<br /><em>langsung jadi publik.</em></h1>
            <p className="hero-sub">Upload file apa pun — otomatis dibagikan ke siapa saja via link.</p>
          </section>

          {/* Upload Zone */}
          <section className="upload-section">
            {!result && (
              <div
                className={`drop-zone ${dragging ? 'drag' : ''} ${uploading ? 'loading' : ''}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => !uploading && inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  onChange={onFileChange}
                  style={{ display: 'none' }}
                />

                {uploading ? (
                  <div className="uploading-state">
                    <span className="spin">{ICON.spinner}</span>
                    <p className="upload-text">Mengunggah ke Drive…</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="progress-num">{Math.round(progress)}%</span>
                  </div>
                ) : (
                  <div className="idle-state">
                    <div className="drop-icon-ring">
                      <span className="drop-icon">{ICON.upload}</span>
                    </div>
                    <p className="drop-title">Seret file ke sini</p>
                    <p className="drop-sub">atau klik untuk memilih · maks 500 MB</p>
                    <div className="supported-types">
                      <span className="type-badge">{ICON.image}<span>Gambar</span></span>
                      <span className="type-badge">{ICON.video}<span>Video</span></span>
                      <span className="type-badge">{ICON.zip}<span>Arsip</span></span>
                      <span className="type-badge">{ICON.file}<span>Dokumen</span></span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="error-box">
                <strong>Gagal:</strong> {error}
                <button onClick={() => setError('')} className="dismiss">✕</button>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="result-box">
                <div className="result-header">
                  <span className="result-file-icon">{getFileIcon(result.mimeType, result.name)}</span>
                  <div className="result-meta">
                    <span className="result-name">{result.name}</span>
                    <span className="result-size">{result.size}</span>
                  </div>
                  <span className="public-badge">{ICON.globe} Publik</span>
                </div>

                <div className="link-list">
                  <LinkRow icon={ICON.eye} label="Lihat di Drive" href={result.viewLink} value={result.viewLink} />
                  <LinkRow icon={ICON.download} label="Link download" href={result.downloadLink} value={result.downloadLink} />
                  <LinkRow icon={ICON.link} label="Link langsung" href={result.directLink} value={result.directLink} />
                  <LinkRow icon={ICON.embed} label="Link embed" href={result.embedLink} value={result.embedLink} />
                </div>

                <button onClick={reset} className="upload-another">
                  {ICON.upload} Upload file lain
                </button>
              </div>
            )}
          </section>

          {/* How it works */}
          <section className="how-section">
            <h2 className="section-title">Cara kerja</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-icon">{ICON.upload}</div>
                <h3>Pilih file</h3>
                <p>Seret & lepas atau klik untuk memilih file dari perangkat kamu.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-icon">{ICON.drive}</div>
                <h3>Upload ke Drive</h3>
                <p>File dikirim ke Google Drive via Service Account menggunakan API resmi.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-num">3</div>
                <div className="step-icon">{ICON.globe}</div>
                <h3>Auto publik</h3>
                <p>Permission diset ke <em>anyone can view</em> — langsung dapat 4 jenis link.</p>
              </div>
            </div>
          </section>

          {/* History */}
          {history.length > 0 && (
            <section className="history-section">
              <h2 className="section-title">Riwayat sesi ini</h2>
              <div className="history-list">
                {history.map((h, i) => (
                  <div key={i} className="history-item">
                    <span className="history-icon">{getFileIcon(h.mimeType, h.name)}</span>
                    <div className="history-meta">
                      <span className="history-name">{h.name}</span>
                      <span className="history-size">{h.size}</span>
                    </div>
                    <a href={h.viewLink} target="_blank" rel="noreferrer" className="history-link">
                      {ICON.eye}
                    </a>
                    <CopyButton text={h.viewLink} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logos">
              <span className="footer-logo" title="Google Drive">{ICON.drive}</span>
              <span className="footer-logo" title="Vercel">{ICON.vercel}</span>
              <span className="footer-logo" title="GitHub">{ICON.github}</span>
            </div>
            <p className="footer-text">Ditenagai Next.js · Deploy di Vercel · Google Drive API</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body {
          font-family: 'Inter', sans-serif;
          background: #f6f4f0;
          color: #1a1714;
          min-height: 100vh;
        }
        a { color: inherit; }

        /* --- PAGE --- */
        .page { display: flex; flex-direction: column; min-height: 100vh; }

        /* --- HEADER --- */
        .header {
          border-bottom: 1px solid #d8d3ca;
          background: #f6f4f0;
          position: sticky; top: 0; z-index: 10;
        }
        .header-inner {
          max-width: 760px; margin: 0 auto;
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .brand { display: flex; align-items: center; gap: 10px; }
        .brand-drive svg { width: 28px; height: 28px; }
        .brand-text {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.2rem; font-weight: 700;
          letter-spacing: -0.02em; color: #1a1714;
        }
        .header-badges { display: flex; gap: 8px; }
        .badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.72rem; font-weight: 500;
          color: #5a5249;
          border: 1px solid #c8c0b4;
          border-radius: 4px;
          padding: 4px 9px;
          background: #fff;
          letter-spacing: 0.01em;
        }
        .badge-icon svg { width: 11px; height: 11px; }

        /* --- MAIN --- */
        .main { flex: 1; max-width: 760px; margin: 0 auto; width: 100%; padding: 0 24px 60px; }

        /* --- HERO --- */
        .hero { padding: 52px 0 36px; text-align: center; }
        .hero-icons {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 24px;
        }
        .hero-icon svg { width: 44px; height: 44px; }
        .hero-icon.small svg { width: 28px; height: 28px; opacity: 0.6; }
        .hero-arrow { font-size: 1.4rem; color: #9b9189; }
        .hero-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 2.4rem; line-height: 1.2;
          letter-spacing: -0.03em; color: #1a1714;
          margin-bottom: 14px;
        }
        .hero-title em { font-style: italic; color: #4a85f5; }
        .hero-sub { font-size: 1rem; color: #6b6158; font-weight: 300; }

        /* --- UPLOAD SECTION --- */
        .upload-section { margin-bottom: 56px; }

        .drop-zone {
          border: 1.5px dashed #b8b0a4;
          border-radius: 8px;
          background: #fff;
      
