export declare enum CarType {
    SUV = "SUV",
    TRUCK = "TRUCK",
    CROSSOVER = "CROSSOVER",
    SEDAN = "SEDAN",
    COUPE = "COUPE",
    CONVERTIBLE = "CONVERTIBLE",
    LUXURY = "LUXURY",
    SPORTS_CAR = "SPORTS_CAR",
    MOTORCYCLE = "MOTORCYCLE"
}
export declare class CreateReportDto {
    year: number;
    make: string;
    model: string;
    type: CarType;
    mileage: number;
    price: number;
    imageUrl: string;
}
