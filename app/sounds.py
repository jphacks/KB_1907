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
from sklearn import preprocessing

def main():
    def speech():
        A = [1.8693221523410197, 1.4822962497381098, 1.5353037766830875, 1.3312852022529458, 0.576441102756891,
             1.8573797678275201, 1.790545917555321, 1.2419803632372677, 2.426855985876181, 2.6928595748820614]
        alt_A =  preprocessing.minmax_scale(A)
        print(A)
        print(alt_A)
        
    speech()
   #print(json.dumps(profile, indent=2))
    




if __name__ == '__main__':
    main()
