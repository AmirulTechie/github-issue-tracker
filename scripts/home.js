let allIssues = [];

const loadIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            showIssues(allIssues);
            setupFilters();
        });
}

const showIssues = (issues) => {
    const cardContainer = document.getElementById('cards-section');
    const issueCounter = document.getElementById('issue-counter');

    issueCounter.innerText = issues.length;
    cardContainer.innerHTML = '';

    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div class="card-body bg-white rounded-xl border-t-3 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-purple-600'} shadow-sm p-4 space-y-3">
                <div class="flex justify-between items-center">
                    <span class="w-6 h-6 flex items-center justify-center rounded-full text-xs">
                        <img src="${issue.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                    </span>
                    <span class="py-1 px-4 rounded-xl font-semibold ${issue.priority === 'high' ? 'bg-red-100 text-red-500' : issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'}"> 
                            ${issue.priority === 'high'
                ? 'HIGH'
                : issue.priority === 'medium'
                    ? 'MEDIUM'
                    : 'LOW'}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-gray-800">
                    ${issue.title}
                </h3>
                <p class="text-sm text-gray-500">
                    ${issue.description}
                </p>
                 <div class="flex gap-3">
                    <span class="py-1 rounded-xl text-[10px]
                          ${issue.labels[0] === 'enhancement'
                ? 'bg-green-100 px-2 text-green-500 border border-green-500'
                : issue.labels[0] === 'bug'
                    ? 'bg-red-100 px-4 text-red-500 border border-red-500'
                    : issue.labels[0] === 'good first issue'
                        ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500'
                        : 'bg-blue-100 px-2 text-blue-500 border border-blue-500'}">
                            ${issue.labels[0] === 'enhancement'
                ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT'
                : issue.labels[0] === 'bug'
                    ? '<i class="fa-solid fa-bug"></i> BUG'
                    : issue.labels[0] === 'good first issue'
                        ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE'
                        : '<i class="fa-regular fa-file-lines"></i> DOCUMENTATION'}
                    </span>

                    <span class="py-1 rounded-xl text-[10px] 
                          ${!issue.labels[1]
                ? ''
                : issue.labels[1] === 'enhancement'
                    ? 'bg-green-100 px-2 text-green-500 border border-green-500'
                    : issue.labels[1] === 'good first issue'
                        ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500'
                        : issue.labels[1] === 'bug'
                            ? 'bg-purple-100 px-2 text-purple-500 border border-purple-500'
                            : issue.labels[1] === 'documentation'
                                ? 'bg-blue-100 px-2 text-blue-500 border border-blue-500'
                                : 'bg-yellow-100 px-2 text-yellow-500 border border-yellow-500'}">
                            ${!issue.labels[1]
                ? ''
                : issue.labels[1] === 'enhancement'
                    ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT'
                    : issue.labels[1] === 'good first issue'
                        ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE'
                        : issue.labels[1] === 'bug'
                            ? '<i class="fa-solid fa-bug"></i> BUG'
                            : issue.labels[1] === 'documentation'
                                ? '<i class="fa-solid fa-book"></i> DOCUMENTATION'
                                : '<i class="fa-solid fa-life-ring"></i> HELP WANTED'}
                    </span>
                </div>
                <div class="flex flex-col gap-1 text-xs text-gray-400 pt-2 border-t">
                    <span>#1 by john_doe</span>
                    <span>1/15/2024</span>
                </div>
            </div>
        `
        cardContainer.append(issueCard);
    })
}

const setupFilters = () => {
    const filterButtons = document.querySelectorAll('main section:first-of-type .btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('btn-primary'));
            e.target.classList.add('btn-primary');
            const filterType = e.target.innerText.toLowerCase();
            if (filterType === 'all') {
                showIssues(allIssues);
            } else if (filterType === 'open') {
                showIssues(allIssues.filter(issue => issue.status === 'open'));
            } else {
                showIssues(allIssues.filter(issue => issue.status !== 'open'));
            }
        });
    });
}

loadIssues();