// ==UserScript==
// @name         YiCAT 谷歌翻译插件
// @namespace    https://github.com/GoblinGe/YiCAT-Addon/
// @version      0.1
// @description  try to take over the world!
// @author       GoblinGe
// @match        https://www.yicat.vip/yicat/editor?docId=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yicat.vip
// @require           https://unpkg.com/jquery@3.6.0/dist/jquery.min.js
// @run-at          document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      translation.googleapis.com/language/translate/v2*
// @connect      *
// ==/UserScript==

(function() {
    let btn=document.createElement("button");
    btn.innerHTML="调用外部翻译";
    btn.style.backgroundColor = "#008CBA";
    btn.style.fontSize="20px";
    btn.style.padding="15px";
    btn.onclick=function(){
        for (var i =0; i < document.getElementsByClassName('atoms-edit mousetrap zh').length; i++){//按照目标语列遍历
            let targetEle = document.getElementsByClassName('atoms-edit mousetrap zh')[i]
            let target = targetEle.innerText;//获取目标语文本
            let lineNum = document.getElementsByClassName('index-num')[i].innerText;
            //console.log('行号',lineNum);
            //alert(target);
            if(target==''){
                let source = document.getElementsByClassName('atoms-edit mousetrap src-text-container edit-div ime-disabled')[i].innerText;//获取对应的源语言文本
                //alert(source);
                let fullurl = "https://translation.googleapis.com/language/translate/v2";
                fullurl += "?q=" + escape(source);
                fullurl += "&target=zh";
                fullurl += "&key=这里替换成你申请的谷歌翻译apikey";
                    GM_xmlhttpRequest({
                        url:fullurl,
                        method :"GET",
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded"
                        },
                        onload:function(xhr){
                            //console.log(xhr.responseText);
                            let rspsJSON = JSON.parse(xhr.responseText);
                            let targetTxt = rspsJSON.data.translations[0].translatedText;
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