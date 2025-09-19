import getData from "../dal.js"

const dataPath = "data-";
const params = (new URL(window.location.href)).searchParams;


const app = {
    data: {},
    page: params.get('page') || "start",
    lang: params.get('lang') || "ua",
    async run(){
        this.data = await getData(`${dataPath}${this.lang}.json`);
       
        /*console.log(this.page);
        console.log(this.data[this.page]);*/
        this.view(this.page);
    },
    view(page){
        console.log(page);
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.textContent = this.data[page]['title'];
        const options = this.data[page]["options"];
        const optionsElements = [];
        for (const key in options){
            let a = document.createElement('a');
            a.href = '?lang='+this.lang+'&page='+ options[key];
            a.textContent = key;
            optionsElements.push(a);
        }
        article.append(h1,...optionsElements);
        document.body.append(article);
    }
}

try { //exception handling
    app.run();
} catch (ex){
    console.log(ex);
}