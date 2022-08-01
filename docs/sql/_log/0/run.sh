#!/usr/bin/env bash
set -Ceu
#---------------------------------------------------------------------------
# つぶやきを保存するDBを作成する。
# CreatedAt: 2022-07-19
#---------------------------------------------------------------------------
Run() {
	THIS="$(realpath "${BASH_SOURCE:-0}")"; HERE="$(dirname "$THIS")"; PARENT="$(dirname "$HERE")"; THIS_NAME="$(basename "$THIS")"; APP_ROOT="$PARENT";
	local DB_NAME=mylog
	local DB_EXT=db
	cd "$HERE"
	for file in `cd create; ls -1 | grep .sql | sort`; do
		echo $file
		sqlite3 ${DB_NAME}.${DB_EXT} < ./create/$file
	done
	sqlite3 ${DB_NAME}.${DB_EXT} -batch '.tables'
	sqlite3 ${DB_NAME}.${DB_EXT} -batch 'select sql from sqlite_master;'
	# https://qiita.com/m-sakano/items/7f1afc7eb452a1a57015
	# select edit('AAA', 'vim'); したあと表示が壊れるので
	stty sane
}
Run "$@"
