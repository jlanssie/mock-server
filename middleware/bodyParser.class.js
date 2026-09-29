class BodyParser {
  async handleRequest(req) {
    req.body = await this.parseJsonStream(req);
  }

  async parseJsonStream(req) {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      return this.parseJson(Buffer.concat(chunks).toString().trim());
    } catch {
      return {};
    }
  }

  handleResponse(res) {
    const end = res.end;
    const chunks = [];

    res.end = (chunk, encoding, callback) => {
      if (chunk) chunks.push(Buffer.from(chunk));

      const raw = Buffer.concat(chunks).toString("utf8").trim();
      res.body = this.parseJson(raw);

      return end.call(res, chunk, encoding, callback);
    };
  }

  parseJson(raw) {
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
}

module.exports = BodyParser;
