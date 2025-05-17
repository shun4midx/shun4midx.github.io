############################################
# Copyright (c) 2025 Shun/翔海 (@shun4midx) #
# Project: School Project of Training Game #
# File Type: Python file                   #
# File: translation.py                     #
############################################

import asyncio
from googletrans import Translator

async def translateText(zh_tw_phrase):
    async with Translator() as translator:
        en_trans = await translator.translate(zh_tw_phrase, dest='en')
        vn_trans = await translator.translate(zh_tw_phrase, dest='vi')
        id_trans = await translator.translate(zh_tw_phrase, dest='id')

        if not en_trans.text[0].isupper() and not en_trans.text[0] == "<":
            en_trans.text = en_trans.text.capitalize()

        if not vn_trans.text[0].isupper() and not vn_trans.text[0] == "<":
            vn_trans.text = vn_trans.text.capitalize()

        if not id_trans.text[0].isupper() and not id_trans.text[0] == "<":
            id_trans.text = id_trans.text.capitalize()

        return f"英文: {en_trans.text}\n越南文: {vn_trans.text}\n印尼文: {id_trans.text}\n"
    
async def translateJSON(zh_tw_json):
    if zh_tw_json[len(zh_tw_json) - 1] == ",":
        zh_tw_json = zh_tw_json[0 : len(zh_tw_json) - 1]

    zh_tw_phrase = zh_tw_json[len('''"zh-tw": "''') : len(zh_tw_json) - 1]

    async with Translator() as translator:
        en_trans = await translator.translate(zh_tw_phrase, dest='en')
        vn_trans = await translator.translate(zh_tw_phrase, dest='vi')
        id_trans = await translator.translate(zh_tw_phrase, dest='id')

        if not en_trans.text[0].isupper() and not en_trans.text[0] == "<":
            en_trans.text = en_trans.text.capitalize()

        if not vn_trans.text[0].isupper() and not vn_trans.text[0] == "<":
            vn_trans.text = vn_trans.text.capitalize()

        if not id_trans.text[0].isupper() and not id_trans.text[0] == "<":
            id_trans.text = id_trans.text.capitalize()

        return f'''{zh_tw_json},\n"en": "{en_trans.text}",\n"vn": "{vn_trans.text}",\n"id": "{id_trans.text}"\n'''

if __name__ == "__main__":
    mode = input("你想要普通翻譯(n)還JSON翻譯(j)？")
    if mode == "n":
        while True: 
            zh_tw_phrase = input("輸入你想要翻譯的一段話：")
            ans = asyncio.run(translateText(zh_tw_phrase))
            print(ans)
    elif mode == "j":
        while True: 
            zh_tw_json = input("輸入你想要翻譯的zh-tw JSON：")
            ans = asyncio.run(translateJSON(zh_tw_json))
            print(ans)