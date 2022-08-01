create table if not exists comments (
  tid integer not null,
  id integer primary key not null,
  content text not null,
  created text default (datetime('now', 'localtime')),
  foreign key (tid) references threads(id)
);

