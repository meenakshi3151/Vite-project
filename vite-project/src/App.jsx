import React, { useEffect, useState } from 'react';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/api/github/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setRepos(data));
    }
  }, [token]);

  const handleSelect = (repo) => {
    alert(`You selected: ${repo.full_name}`);
    // You can send repo info to backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🗂️ Your GitHub Repositories</h1>

        {repos.length === 0 ? (
          <p className="text-gray-400">Fetching repos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-700 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {repo.description || 'No description'}
                </p>
                <button
                  onClick={() => handleSelect(repo)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Select Repo
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Repos;
