// m3: Custom middleware for handling "not found" scenarios
// Could be use or not, makes routing a bit longer to write
/**
 *
 * @param {*} req
 * @param {ServerResponse} res
 * @param {*} next
 * @returns
 */
function handleNotFound(req, res, next) {
  if (res.outputData.length === 0) {
    return res.status(404).json({ message: "Resource not found" });
  }
  next();
}

/* Example:
router.delete('/:id', (req, res, next) => {
  const queryParams = [req.params.id];
  deleteQuiz(queryParams)
    .then(data => {
      next(); // Proceed to the next middleware (handleNotFound)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}, handleNotFound, (req, res) => {
  res.json("Entry successfully deleted");
});
*/

module.exports = { handleNotFound };