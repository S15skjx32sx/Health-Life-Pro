import { LightningElement, wire } from 'lwc';
import fetchRecords from '@salesforce/apex/csvController.fetchRecords';

export default class CsvComponent extends LightningElement {
    accountData = [];
    columns = [
        { label: "First Name", fieldName: "FirstName" },
        { label: "Last Name", fieldName: "LastName" },
        { label: "Phone", fieldName: "Phone" },
        { label: "Salutation", fieldName: "Salutation" },
        { label: "Title", fieldName: "Title" }
    ];
    
    @wire(fetchRecords) wiredFunction({ data, error }) {
        if (data) {
            this.accountData = data;
        } else if (error) {
            console.log(error);
        }
    }

    get checkRecord() {
        return this.accountData.length === 0;
    }

    clickHandler() {
        let selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();
        let downloadRecords = selectedRows.length > 0 ? [...selectedRows] : [...this.accountData];

        let csvFile = this.convertArrayToCsv(downloadRecords);  // 🛠️ fixed typo: csvfile => csvFile
        this.createLinkForDownload(csvFile);
    }

    convertArrayToCsv(downloadRecords) {
        if (!downloadRecords.length) {
            return '';
        }
        let csvHeader = Object.keys(downloadRecords[0]).join(",");  // 🛠️ fixed: Object.keys() does not need .toString()
        let csvBody = downloadRecords.map(record => Object.values(record).join(","));
        let csvFile = csvHeader + "\n" + csvBody.join("\n");
        return csvFile;
    }

    createLinkForDownload(csvFile) {
        const downLink = document.createElement("a");
        downLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvFile);
        downLink.target = "_blank";
        downLink.download = "DemoData.csv";
        downLink.click();
    }
}
