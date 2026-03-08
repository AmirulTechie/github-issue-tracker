let allIssues = [];
let currentFilter = 'all';

const toggleSpinner = (show) => {
    const spinner = document.getElementById('spinner');
    if (show) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};

const loadIssues = () => {
    toggleSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            showIssues(allIssues);
            setupFilters();
            setupSearch();
        })
        .finally(() => toggleSpinner(false));
}

const loadWordDetail = async (id) => {
    toggleSpinner(true);
    try {
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetails(details.data);
    } catch (error) {
        console.error(error);
    } finally {
        toggleSpinner(false);
    }
}

const displayWordDetails = (issue) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <div class="flex flex-col gap-2">
            <h3 class="text-2xl font-bold text-slate-800">${issue.title}</h3>
            <div class="flex items-center gap-3 text-sm text-gray-500 mb-6">
                <span class="w-6 h-6 flex items-center justify-center rounded-full text-xs">
                    <img src="${issue.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt=""> •
                </span>
                <p>Opened by <span class="font-semibold text-slate-700">${issue.author}</span> • ${new Date(issue.createdAt).toLocaleString()}</p>
            </div>
        </div>
        <div class="flex gap-3">
            <span class="py-1 rounded-xl text-[10px] ${issue.labels[0] === 'enhancement' ? 'bg-green-100 px-2 text-green-500 border border-green-500' : issue.labels[0] === 'bug' ? 'bg-red-100 px-4 text-red-500 border border-red-500' : issue.labels[0] === 'good first issue' ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500' : 'bg-blue-100 px-2 text-blue-500 border border-blue-500'}">
                ${issue.labels[0] === 'enhancement' ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT' : issue.labels[0] === 'bug' ? '<i class="fa-solid fa-bug"></i> BUG' : issue.labels[0] === 'good first issue' ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE' : '<i class="fa-regular fa-file-lines"></i> DOCUMENTATION'}
            </span>
            <span class="py-1 rounded-xl text-[10px] ${!issue.labels[1] ? '' : issue.labels[1] === 'enhancement' ? 'bg-green-100 px-2 text-green-500 border border-green-500' : issue.labels[1] === 'good first issue' ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500' : issue.labels[1] === 'bug' ? 'bg-purple-100 px-2 text-purple-500 border border-purple-500' : issue.labels[1] === 'documentation' ? 'bg-blue-100 px-2 text-blue-500 border border-blue-500' : 'bg-yellow-100 px-2 text-yellow-500 border border-yellow-500'}">
                ${!issue.labels[1] ? '' : issue.labels[1] === 'enhancement' ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT' : issue.labels[1] === 'good first issue' ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE' : issue.labels[1] === 'bug' ? '<i class="fa-solid fa-bug"></i> BUG' : issue.labels[1] === 'documentation' ? '<i class="fa-solid fa-book"></i> DOCUMENTATION' : '<i class="fa-solid fa-life-ring"></i> HELP WANTED'}
            </span>
        </div>
        <p class="py-6 text-slate-600 leading-relaxed border-b border-slate-100">${issue.description}</p>
        <div class="flex items-center justify-start mt-6 gap-28">
            <div class="flex flex-col">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee:</span>
                <span class="font-bold text-slate-800">${issue.assignee ? issue.assignee : "Not Assigned"}</span>
            </div>
            <div>
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</span>
                <br>
                <span class="py-1 px-4 rounded-xl font-semibold ${issue.priority === 'high' ? 'bg-red-100 text-red-500' : issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'}">
                    ${issue.priority === 'high' ? 'HIGH' : issue.priority === 'medium' ? 'MEDIUM' : 'LOW'}
                </span>
            </div>
        </div>
    `;
    document.getElementById('my_modal_5').showModal();
}

const showIssues = (issues) => {
    const cardContainer = document.getElementById('cards-section');
    const issueCounter = document.getElementById('issue-counter');
    issueCounter.innerText = issues.length;
    cardContainer.innerHTML = '';
    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div onclick="loadWordDetail(${issue.id})" class="card-body bg-white rounded-xl border-t-3 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-purple-600'} shadow-sm p-4 space-y-3 cursor-pointer">
                <div class="flex justify-between items-center">
                    <span class="w-6 h-6 flex items-center justify-center rounded-full text-xs">
                        <img src="${issue.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                    </span>
                    <span class="py-1 px-4 rounded-xl font-semibold ${issue.priority === 'high' ? 'bg-red-100 text-red-500' : issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'}"> 
                        ${issue.priority === 'high' ? 'HIGH' : issue.priority === 'medium' ? 'MEDIUM' : 'LOW'}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-gray-800">${issue.title}</h3>
                <p class="text-sm text-gray-500">${issue.description}</p>
                <div class="flex gap-3">
                    <span class="py-1 rounded-xl text-[10px] ${issue.labels[0] === 'enhancement' ? 'bg-green-100 px-2 text-green-500 border border-green-500' : issue.labels[0] === 'bug' ? 'bg-red-100 px-4 text-red-500 border border-red-500' : issue.labels[0] === 'good first issue' ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500' : 'bg-blue-100 px-2 text-blue-500 border border-blue-500'}">
                        ${issue.labels[0] === 'enhancement' ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT' : issue.labels[0] === 'bug' ? '<i class="fa-solid fa-bug"></i> BUG' : issue.labels[0] === 'good first issue' ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE' : '<i class="fa-regular fa-file-lines"></i> DOCUMENTATION'}
                    </span>
                    <span class="py-1 rounded-xl text-[10px] ${!issue.labels[1] ? '' : issue.labels[1] === 'enhancement' ? 'bg-green-100 px-2 text-green-500 border border-green-500' : issue.labels[1] === 'good first issue' ? 'bg-indigo-100 px-2 text-indigo-500 border border-indigo-500' : issue.labels[1] === 'bug' ? 'bg-purple-100 px-2 text-purple-500 border border-purple-500' : issue.labels[1] === 'documentation' ? 'bg-blue-100 px-2 text-blue-500 border border-blue-500' : 'bg-yellow-100 px-2 text-yellow-500 border border-yellow-500'}">
                        ${!issue.labels[1] ? '' : issue.labels[1] === 'enhancement' ? '<i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT' : issue.labels[1] === 'good first issue' ? '<i class="fa-regular fa-star"></i> GOOD FIRST ISSUE' : issue.labels[1] === 'bug' ? '<i class="fa-solid fa-bug"></i> BUG' : issue.labels[1] === 'documentation' ? '<i class="fa-solid fa-book"></i> DOCUMENTATION' : '<i class="fa-solid fa-life-ring"></i> HELP WANTED'}
                    </span>
                </div>
                <div class="flex flex-col gap-1 text-xs text-gray-400 pt-2 border-t">
                    <span class="">#${issue.id} by ${issue.author}</span>
                    <span> ${new Date(issue.createdAt).toLocaleString()}</span>
                </div>
            </div>
        `;
        cardContainer.append(issueCard);
    })
}

const applyFiltersAndSearch = () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const filtered = allIssues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm) ||
            issue.id.toString().includes(searchTerm);

        const matchesFilter = (currentFilter === 'all') ||
            (currentFilter === 'open' && issue.status === 'open') ||
            (currentFilter === 'closed' && issue.status !== 'open');

        return matchesSearch && matchesFilter;
    });

    showIssues(filtered);
}

const setupFilters = () => {
    const filterButtons = document.querySelectorAll('main section:first-of-type .btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('btn-primary'));
            e.target.classList.add('btn-primary');
            currentFilter = e.target.innerText.toLowerCase();
            applyFiltersAndSearch();
        });
    });
}

const setupSearch = () => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', applyFiltersAndSearch);
}

loadIssues();