/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoint to manage products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: The list of all products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       "200":
 *         description: The list of all products
 *       "400":
 *         description: Invalid ID
 *       "404":
 *         description: The product not found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "201":
 *         description: Product created successfully
 *       "400":
 *         description: Inputs are invalid
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update existing product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "200":
 *         description: Product updated successfully
 *       "400":
 *         description: Inputs are invalid
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete existing product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       "200":
 *         description: Product deleted successfully
 *       "400":
 *         description: Invalid ID
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */




/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoint to manage categories
 */


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       "200":
 *         description: The list of all categories
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       "200":
 *         description: The list of all categories
 *       "400":
 *         description: Invalid ID
 *       "404":
 *         description: The category not found
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       "201":
 *         description: Category created successfully
 *       "400":
 *         description: Inputs are invalid
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update existing category
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       "200":
 *         description: Category updated successfully
 *       "400":
 *         description: Inputs are invalid
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete existing category
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       "200":
 *         description: Category deleted successfully
 *       "400":
 *         description: Invalid ID
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/categories/{id}/products:
 *   get:
 *     summary: Get category products
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       "200":
 *         description: The list of products
 *       "400":
 *         description: Invalid ID
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoint to manage users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: The list of all Users
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description: User logined successfully
 *       "400":
 *         description: Inputs are invalid
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: User Registered successfully
 *       "400":
 *         description: Inputs are invalid
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
