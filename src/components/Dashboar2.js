import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [input, setInput] = useState('');
  const [wikiResult, setWikiResult] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleSearch = async () => {
    if (!input.trim()) return;

    try {
      const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${input}`);
      const wikiData = await wikiResponse.json();

      setWikiResult(wikiData.extract || 'No Wikipedia summary found.');
      setYoutubeLink(`https://www.youtube.com/results?search_query=${encodeURIComponent(input)}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWikiResult('Failed to fetch data.');
      setYoutubeLink('');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary mb-2">Learning Journey Navigator</h1>
      <p className="mb-4 text-muted">Discover information and resources about your dream career</p>

      <div className="d-flex justify-content-center">
        <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Software Engineer, Doctor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>
      </div>

      {wikiResult && (
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Wikipedia Summary</h5>
                <p className="card-text">{wikiResult}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">YouTube Resources</h5>
                <p className="card-text">
                  <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                    Click here to view YouTube search results
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
