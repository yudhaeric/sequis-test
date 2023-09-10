// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/categories.js

export default function handler(req, res) {
  // Data categories dalam format JSON
  const categories = {
    "data": [
      {
        "id": 1,
        "title": "All Articles"
      },
      {
        "id": 2,
        "title": "Fashion & Beauty"
      },
      {
        "id": 3,
        "title": "Film"
      },
      {
        "id": 4,
        "title": "Food & Drink"
      },
      {
        "id": 5,
        "title": "Travel"
      },
      {
        "id": 6,
        "title": "Business & Work"
      },
    ]
  };

  // Mengirimkan data sebagai respons JSON
  res.status(200).json(categories);
}  