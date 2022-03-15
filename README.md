# YiCAT-Addon
YiCAT 调用谷歌翻译插件

自己去申请一个谷歌翻译api,填到脚本里的相应位置。
用油猴来添加这个脚本即可。
进入YiCAT翻译界面，右上角会出现一个“调用外部翻译”的丑陋的按钮。
点击即可翻译。
方向是英译汉，如果需要修改，可以改脚本中的target目标语言代码。就是这一行代码 fullurl += "&target=zh"; 中的zh代表目标是中文，如果目标语是英文则改为 en,其他语言代码可以看： https://cloud.google.com/translate/docs/languages
