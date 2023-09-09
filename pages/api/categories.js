// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/categories.js

export default function handler(req, res) {
  // Data categories dalam format JSON
  const categories = {
    "data": [
      {
        "id": 1,
        "title": "Food"
      },
      {
        "id": 2,
        "title": "Travel"
      },
      {
        "id": 3,
        "title": "Fashion And Beauty"
      },
      {
        "id": 4,
        "title": "Film"
      },
      {
        "id": 5,
        "title": "Business And Work"
      }
    ]
  };

  // Mengirimkan data sebagai respons JSON
  res.status(200).json(categories);
}  