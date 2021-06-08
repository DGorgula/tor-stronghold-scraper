#!/bin/bash
set -e

# SCRAPER_USERNAME is the userName used from applicatoin code to interact with databases and SCRAPER_PASSWORD is the password for this user.
# MONGO_INITDB_ROOT_USERNAME & MONGO_INITDB_ROOT_PASSWORD is the config for db admin.
# admin user is expected to be already created when this script executes. We use it here to authenticate as admin to create
# SCRAPER_USERNAME and databases.

echo ">>>>>>> trying to create database and users"
if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${SCRAPER_USERNAME:-}" ] && [ -n "${SCRAPER_PASSWORD:-}" ] && [ -n "${SERVER_USERNAME:-}" ] && [ -n "${SERVER_PASSWORD:-}" ]; then

mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
db=db.getSiblingDB('stronghold');
db=db.getSiblingDB('analysis');
use stronghold;
db.createUser({
  user:  '$SCRAPER_USERNAME',
  pwd: '$SCRAPER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'stronghold'
  }, {
  user:  '$SERVER_USERNAME',
  pwd: '$SERVER_PASSWORD',
  roles: [{
    role: 'read',
    db: 'stronghold'
  }]
});
use analysis;
db.createUser({
 user:  '$SERVER_USERNAME',
  pwd: '$SERVER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'analysis'
  }]
});
EOF
else
    echo "MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD,SCRAPER_USERNAME and SCRAPER_PASSWORD must be provided. Some of these are missing, hence exiting database and user creatioin"
    exit 403
fi