exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("categories").insert([
        { category_id: 1, category_name: "shelters" },
        { category_id: 2, category_name: "health_care" },
        { category_id: 3, category_name: "food" },
        { category_id: 4, category_name: "hygiene" },
        { category_id: 5, category_name: "outreach_services" },
        { category_id: 6, category_name: "education" },
        { category_id: 7, category_name: "legal_administrative" },
        { category_id: 8, category_name: "jobs" }
      ]);
    });
};
