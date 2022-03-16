export default function handler(req, res) {
    if (req.method === 'POST') {
    res.status(200).json({ id: req.body.id })
    }
    else {
        res.status(200).send("Get")
    }
  }