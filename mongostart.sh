#!/bin/bash
mongoimport --db etaisyydet --collection etaisyydet --drop --file ./etaisyydet.json
mongoimport --db etaisyydet --collection sijainnit --drop --file ./sijainnit.json
mongod --dbpath /data/db/ --port 12345
