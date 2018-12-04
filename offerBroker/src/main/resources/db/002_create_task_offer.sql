create table task_offer (
  id uuid primary key,
  title text,
  description text,
  posted_by uuid references user_account(id),
  claimed_by uuid references user_account(id),
  location geography(point, 4326)
);
