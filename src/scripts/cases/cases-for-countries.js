import Start from './start';
class ProcessTableData {
    constructor(countriesInfo) {
        this.infoByCountries = countriesInfo;
        this.descending = true;
        this.search = false;
    }
    startProcessing() {
        this.countGlobalCases();
        this.sortNumbers();
        this.renderData();
        this.processControllers();
    }
    processControllers() {
        const inputField = document.querySelector(".input-field");
        const sortFields = document.querySelectorAll(".sort-field");
        sortFields[0].addEventListener("click", () => { this.sortNumbers() });
        sortFields[1].addEventListener("click", () => { this.sortWords() });
        inputField.addEventListener("input", (e) => { this.searchData(e) });
        document.querySelectorAll(".data-cell").forEach((cellData) => {
            cellData.addEventListener("click", () => {
                if (this.search) {
                    document.querySelectorAll(".data-cell").forEach((item) => {
                        item.classList.toggle("hide", true);
                    })
                    cellData.classList.toggle("hide", false);
                    this.search = false;
                };
            });
        })
    }
    countGlobalCases() {
        let total = 0;
        this.infoByCountries.forEach((value) => {total += value.TotalConfirmed});
        document.querySelector(".global-cases-value").textContent = `${total}`;            
    }
    renderData() {
        let i = 0;
        this.infoByCountries.forEach((value) => {
            let divWrapper = document.createElement("div");
            divWrapper.classList.add("data-cell");
            divWrapper.setAttribute("id", `row-${i}`);
            let div = document.createElement("div");
            div.classList.add("cell-value");
            div.textContent = value.TotalConfirmed;
            divWrapper.appendChild(div);
            div = document.createElement("div");
            div.textContent = value.Country;
            div.setAttribute("id", `${value.CountryCode}`);
            divWrapper.appendChild(div);
            div = document.createElement("div");
            let img = document.createElement("img");
            div.appendChild(img);
            img.src = `https://www.countryflags.io/${value.CountryCode}/shiny/64.png`;
            img.style.width = "35px";
            img.style.height = "30px";
            divWrapper.appendChild(div);
            document.querySelector(".table-data").appendChild(divWrapper);
            i += 1;
        });
    }
    resetData() {
        document.querySelectorAll(".data-cell").forEach((el) => el.remove());
    }
    sortNumbers() {
        if (this.descending) {
            this.infoByCountries.sort((a, b) => (b.TotalConfirmed > a.TotalConfirmed) ? 1 : -1);
            this.descending = false;
        } else {
            this.infoByCountries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1);
            this.descending = true;
        }
        this.resetData();
        this.renderData();
    }
    sortWords() {
        if (this.descending) {
            this.infoByCountries.sort((a, b) => (b.Country > a.Country) ? 1 : -1);
            this.descending = false;
        } else {
            this.infoByCountries.sort((a, b) => (a.Country > b.Country) ? 1 : -1);
            this.descending = true;
        }
        this.resetData();
        this.renderData();
    }
    searchData(e) {
        let i = 0;
        this.search = true;
        const userWord = e.target.value.toLowerCase();
        this.infoByCountries.forEach((item) => {
            const tableWord = item.Country.toLowerCase();
            let cellData = document.querySelector(".table-data").querySelector(`#row-${i}`);
            if (tableWord.includes(userWord)) {
                cellData.classList.toggle("hide", false);
            } else cellData.classList.toggle("hide", true);
            i += 1;
        });
        if (userWord === "") this.search = false;
    }
}

const start = new Start();
start.startWork();