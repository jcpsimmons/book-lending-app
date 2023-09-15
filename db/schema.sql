create table if not exists `book` (
  `id` int(11) not null auto_increment,
  `title` varchar(255) not null,
  `author` varchar(255) not null,
  `created_at` datetime not null,
  `updated_at` datetime not null,

  primary key (`id`)
) 
