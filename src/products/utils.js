const excelGenerator = (products, name, res) => {
  const x1 = require("excel4node");
  products = products.map((product) => {
    let id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product,
    };
  });
  let workBook = new x1.Workbook();
  let workSheet = workBook.addWorksheet("inventario");

  for (let i = 1; i <= products.length; i++) {
    for (let j = 1; j <= Object.values(products[0]).length; j++) {
      let data = Object.values(products[i - 1])[j - 1];
      if (typeof data === "string") {
        workSheet.cell(i, j).string(data);
      } else {
        workSheet.cell(i, j).number(data);
      }
    }
  }
  workBook.write(`${name}.xlsx`, res);
};

module.exports.ProductsUtil = {
  excelGenerator,
};
