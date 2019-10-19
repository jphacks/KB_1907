# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, session
import logging
import re
import os
import json
import pprint
from os.path import join, dirname
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

def main():
    def speech():
        authenticator = IAMAuthenticator('VNYNGcQrwZaumnTJMani2qbBa8veDOfjXQBRXsr3l5rX')
        speech_to_text = SpeechToTextV1(authenticator=authenticator)
        speech_to_text.set_service_url('https://gateway-tok.watsonplatform.net/speech-to-text/api')
        lang = "ja-JP_BroadbandModel"
        with open('sample.mp3','rb') as audio_file:
            speech_recognition_results = speech_to_text.recognize(
                audio=audio_file,
                model=lang,
                content_type='audio/mp3',
                timestamps=True,
                speaker_labels=True,
            ).get_result()
        
        t = str(json.dumps(speech_recognition_results, indent=2, ensure_ascii=False))

        with open('sound.json', 'w',encoding='utf-8') as f:
            f.write(t)

            
        """
        #print(json.dumps(profile, indent=2))
        for x in profile['personality']:
            print(x['trait_id'], x['percentile'])
        """  
        sentences = {}
        sentence_counter = 0
        for x in speech_recognition_results['results']:
            for y in x['alternatives']:
                sentences[str(sentence_counter)] = {}
                sentences[str(sentence_counter)]["sentence_start"] = y['timestamps'][0][1]
                sentences[str(sentence_counter)]["sentence_end"] = y['timestamps'][-1][2]
                sentence_counter += 1
        print(sentences)
                
    
    speech()
   #print(json.dumps(profile, indent=2))
    




if __name__ == '__main__':
    main()
