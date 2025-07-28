import express from 'express';
import prisma from '../../../lib/db';

const router = express.Router();

router.get("", async(req, res) => {
    try{
  
      return res.status(200).json({})
    } catch(error){
       return res.status(500).json({
        message: "",
        error:error.message
       })
    }
});

// Total customers per store
router.get("store/total-customers/:id", async(req, res) => {
    try{
        const storeId = parseInt(req.params.id);

        const totalCustomers = await prisma.customer.count({
            where:{
                storeId: storeId
            }
        });

        return res.status(200).json({
            message: "Total customers retrieved",
            data: totalCustomers
        })
    } catch(error){
       return res.status(500).json({
        message: "No customers available",
        error:error.message
       })
    }
});

// Total sale per store.
router.get("store/total-sales/:id", async(req, res) => {
    try{

        const storeId = parseInt(req.params.id);

        const totalSales = await prisma.order.aggregate({
            where: {
                storeId: storeId
            },
            _sum: {
                totalAmount:true
            }
        });

        return res.status(200).json({
         message: "Stores total sales retrieved",
         data: totalSales._sum.totalAmount || 0,
        });

    } catch(error){

        return res.status(500).json({
         message: "No your store do not have sales",
         error:error.message
        });
    }
});

router.get("store/", async(req, res) => {

    try{
        return res.status(200).json({
            message: "",
            data:store
        });
    } catch(error){
        return res.status(500).json({
            message: "",
            error: error.message
        });
    }
})