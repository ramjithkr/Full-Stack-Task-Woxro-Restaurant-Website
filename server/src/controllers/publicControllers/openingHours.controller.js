import * as openingService from "../../services/public/openingHours.service.js";

export const getOpeningHours = async (req, res, next) => {
  try {
    const data = await openingService.getAllOpeningHours();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No opening hours found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// admin 

// export const updateOpeningHours = async (req, res, next) => {
//   try {
//     const { day } = req.params;

//     if (!day) {
//       return res.status(400).json({
//         success: false,
//         message: "Day parameter is required",
//       });
//     }

//     const updated = await openingService.updateOpeningHours(day, req.body);

//     res.json({
//       success: true,
//       data: updated,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
