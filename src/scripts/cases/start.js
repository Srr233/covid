export default class Start {
    constructor() {

    }
    startWork() {
        this.makePageLayout();
        this.extractData();
    }
    extractData() {
        fetch('https://api.covid19api.com/summary').then(response => response.json()).then(data => {
            const process = new ProcessTableData(data.Countries);
            process.startProcessing();
        });
    }
    makePageLayout() {
        const pageWrapper = document.createElement("div");
        const globalCases = document.createElement("div");
        const globalCasesTxt = document.createElement("h3");
        const globalCasesVal = document.createElement("div");
        const dataTableHeader = document.createElement("h3");
        const dataTableWrapper = document.createElement("div");
        const sortWrapper = document.createElement("div");
        pageWrapper.classList.add("page-wrapper");
        globalCasesVal.classList.add("global-cases-value");
        globalCasesVal.classList.add("global-cases-txt");
        globalCases.classList.add("global-cases");
        dataTableHeader.classList.add("table-header");
        sortWrapper.classList.add("sort-wrapper");
        dataTableWrapper.classList.add("table-data");
        globalCases.appendChild(globalCasesTxt);
        globalCases.appendChild(globalCasesVal);
        pageWrapper.appendChild(globalCases);
        pageWrapper.appendChild(dataTableHeader);
        pageWrapper.appendChild(sortWrapper);
        pageWrapper.appendChild(dataTableWrapper);
        document.body.appendChild(pageWrapper);
        globalCasesTxt.textContent = "Global Cases";
        dataTableHeader.textContent = "Cases by Country/Region/Sovereignty";
        for (let i = 0; i < 3; i++) {
            let div;
            if (i < 2) {
                div = document.createElement("button");
                div.classList.add("sort-field");
                div.textContent = "Sort";
            } else {
                div = document.createElement("INPUT");
                div.classList.add("input-field");
                div.setAttribute("type", "text");
                div.setAttribute("placeholder", "Search");
            };
            sortWrapper.appendChild(div);
        }
    }
}