const db = require('../config/db.config');

class Part {
  constructor(part) {
    this.name = part.name;
    this.partType = part.partType;
    this.brand = part.brand;
    this.quantityInStock = part.quantityInStock;
    this.price = part.price;
    this.status = part.status;
  }

  static create(newPart, result) {
    db.query("INSERT INTO parts (name, partType, brand, quantityInStock, price, status) VALUES (?, ?, ?, ?, ?, ?)",
      [newPart.name, newPart.partType, newPart.brand, newPart.quantityInStock, newPart.price, newPart.status],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: res.insertId, ...newPart });
      });
  }

  static findAll(result) {
    db.query("SELECT * FROM parts", (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  static findById(id, result) {
    db.query("SELECT * FROM parts WHERE id = ?", id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  }

  static updateById(id, part, result) {
    db.query(
      "UPDATE parts SET name = ?, partType = ?, brand = ?, quantityInStock = ?, price = ?, status = ? WHERE id = ?",
      [part.name, part.partType, part.brand, part.quantityInStock, part.price, part.status, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, { id: id, ...part });
      }
    );
  }

  static delete(id, result) {
    db.query("DELETE FROM parts WHERE id = ?", id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Part; 