-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "last_promotion" TIMESTAMP(3),
    "salary" DECIMAL(65,30) NOT NULL,
    "performance_score" DOUBLE PRECISION,
    "vacation_days_left" INTEGER,
    "manager_id" TEXT,
    "location" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
