// ==UserScript==
// @name         YiCAT 免费翻译插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       GoblinGe
// @match        https://www.yicat.vip/yicat/editor?docId=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yicat.vip
// @require           https://unpkg.com/jquery@3.6.0/dist/jquery.min.js
// @run-at          document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      api.66mz8.com
// @connect      *
// ==/UserScript==

(function() {
    let btn=document.createElement("button");
    btn.innerHTML="调用免费翻译";
    btn.style.backgroundColor = "#008CBA";
    btn.style.fontSize="20px";
    btn.style.padding="15px";
    btn.onclick=function(){
        for (var i =0; i < document.getElementsByClassName('atoms-edit mousetrap zh').length; i++){//按照目标语列遍历
            let targetEle = document.getElementsByClassName('atoms-edit mousetrap zh')[i]
            let target = targetEle.innerText;//获取目标语文本
            let lineNum = document.getElementsByClassName('index-num')[i].innerText;
            if(target==''){
                let source = document.getElementsByClassName('atoms-edit mousetrap src-text-container edit-div ime-disabled')[i].innerText;//获取对应的源语言文本
                //alert(source);
                let fullurl = "https://api.66mz8.com/api/translation.php";
                fullurl += "?info=" + escape(source);
                GM_xmlhttpRequest({
                    url:fullurl,
                    method :"GET",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    onload:function(xhr){
                        //console.log(xhr.responseText);
                        let rspsJSON = JSON.parse(xhr.responseText);
                        console.log(rspsJSON);
                        let targetTxt = rspsJSON.fanyi;
                        console.log(targetTxt);
                        targetEle.innerText =targetTxt;
                    }
                });

            }
        }
    }
    setTimeout(function () {
        let fenggezhinan= document.querySelector('#app > div.translator > div.editor-toolbar.editor-toolbar > div.panel.panel1 > div.container > div:nth-child(14)');
        fenggezhinan.parentElement.insertBefore(btn,fenggezhinan);
    }, 4000);

})();