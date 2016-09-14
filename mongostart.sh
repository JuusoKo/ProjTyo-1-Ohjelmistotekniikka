#!/bin/bash
./mongoimport --db etaisyydet --collection etaisyydet --drop --file ../../etaisyydet.json 
mongod --dbpath /home/juuso/Projects/TAMK/ohjProjektit/mongodb/data/db/

