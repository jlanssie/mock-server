export default class BodyParser {
  // ⚠️ Only JSON is supported

  async handleRequest(req) {
    await this.#handleJsonBody(req);
  }

  handleResponse(res) {
    return this.#handleJsonResponse(res);
  }

  async #handleJsonBody(req) {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      req.body = this.#parseJson(Buffer.concat(chunks).toString().trim());
    } catch {
      req.body = {};
    }
  }

  async #handleJsonResponse(res) {
    const end = res.end;
    const chunks = [];

    res.end = (chunk, encoding, callback) => {
      if (chunk) chunks.push(Buffer.from(chunk));

      const raw = Buffer.concat(chunks).toString("utf8").trim();
      res.body = this.#parseJson(raw);

      return end.call(res, chunk, encoding, callback);
    };
  }

  #parseJson(raw) {
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
}
