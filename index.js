const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
var repo = [];
function getData(err,data){
    if(err){
        console.log("error");
    }
    var dom = cheerio.load(data.body);
    dom(".Box-row").each((index,el) => {
        const title = dom(el).find("h1 a").text().replace(/\s\s+/g,'').trim();
        const description = dom(el).find("article p").text().replace(/\s\s+/g,'').trim();
        const url = dom(el).find(".h3 a").attr('href');
        const stars = dom(el).find(".f6 a:nth-of-type(1)").text().trim() || '0';
        const forks = dom(el).find(".f6 a:nth-of-type(2)").text().trim() || '0';
        const language = dom(el).find(".repo-language-color + span").text().trim() || '';



        repo.push({title,description,url,stars,forks,language});

    })
    console.log(repo);

    fs.writeFile("./repo.json", JSON.stringify(repo), (err) => {
            if (err) {
            console.log(err);
            }else{
                console.log("Data saved to repo.json");
            }
        });


}


request('https://www.github.com/trending',getData);


var dev = [];

function DeveloperDet(err,data){
    if(err){
        console.log("Occuring Error while trying to fetch data");
    }

    var dom = cheerio.load(data.body);

    dom(".Box-row.d-flex").each((index,el) => {
        const Devname = dom(el).find('h1 a').text().replace(/\s\s+/g,'').trim();
        const Username = dom(el).find(".f4 a").text().trim();
        const reponame = dom(el).find('h1.h4 a').text().trim();  
        const description = dom(el).find('.f6.color-fg-muted.mt-1').text().trim() || '';

        dev.push({Devname,Username,reponame,description});
    })
    console.log(dev);

    fs.writeFile("./dev.json", JSON.stringify(dev), (err) => {
        if (err) {
        console.log(err);
        }else{
            console.log("Data saved to dev.json");
        }
    });




}


request('https://github.com/trending/developers/javascript?since=daily',DeveloperDet);



