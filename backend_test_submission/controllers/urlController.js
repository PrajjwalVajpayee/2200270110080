import Url from '../model/Url.js';

export const createShortUrl = async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url || !validity || !shortcode) {
    return res.status(400).json({ error: "url, validity, and shortcode are required!" });
  }

  try {
    // Check if shortcode already exists
    const existing = await Url.findOne({ shortId: shortcode });
    if (existing) {
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const expiresAt = new Date(Date.now() + validity * 60 * 1000);
    const newUrl = await Url.create({
      originalUrl: url,
      shortId: shortcode,
      expiresAt,
    });

    const host = `${req.protocol}://${req.get("host")}`;

    return res.status(201).json({
      shortlink: `${host}/${shortcode}`,
      expiry: expiresAt.toISOString(),
    });

  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (!url) return res.status(404).send("URL not found");
    if (url.expiresAt < new Date()) return res.status(410).send("Link expired");

    // Click info
    const userAgent = req.get('User-Agent') || 'unknown';
    const source = userAgent.toLowerCase().includes("chrome") ? "chrome"
                  : userAgent.toLowerCase().includes("firefox") ? "firefox"
                  : "other";

    // Geo location placeholder — real IP geolocation requires external API
    const location = "India"; // static or dummy for now

    url.clicks.push({
      timestamp: new Date(),
      source,
      location
    });

    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const getUrlStats = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOne({ shortId: id });

    if (!url) return res.status(404).json({ error: "URL not found" });

    return res.json({
      shortId: url.shortId,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      clickCount: url.clicks.length,
      clicks: url.clicks
    });
  } catch (err) {
    return res.status(500).json({ error: "Error fetching stats" });
  }
};

