create table if not exists comments (
  id integer primary key not null,
  content text not null,
  created integer not null
);
/*
create table if not exists comments (
  id integer primary key not null,
  content text not null,
  created text default (datetime('now', 'localtime'))
);
*/

