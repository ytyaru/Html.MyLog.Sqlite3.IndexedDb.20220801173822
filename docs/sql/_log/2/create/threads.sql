create table if not exists threads (
  id integer primary key not null,
  title text not null,
  created text default (datetime('now', 'localtime')),
  closed text
);

