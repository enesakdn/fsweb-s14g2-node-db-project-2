const router = require("express").Router();
const mid = require("./cars-middleware");
const carsModel = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    let allCars = await carsModel.getAll();
    res.json(allCars);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mid.checkCarPayload,
  mid.checkVinNumberUnique,
  mid.checkVinNumberValid,
  async (req, res, next) => {
    try {
      const { vin, make, model, mileage, title, transmission } = req.body;
      let posted = await carsModel.create({
        vin: vin,
        make: make,
        model: model,
        mileage: mileage,
        title: title,
        transmission: transmission,
      });

      res.status(201).json(posted);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/:id", mid.checkCarId, async (req, res, next) => {
  try {
    res.json(req.currentCar);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
