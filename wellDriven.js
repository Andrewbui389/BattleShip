const cars = [
    { make: 'Toyota', yrsOld: 5, mileage: 92399 },
    { make: 'Ford', yrsOld: 12, mileage: 255005 },
    { make: 'Ferrari', yrsOld: 9, mileage: 12966 },
    { make: 'Subaru', yrsOld: 9, mileage: 111266 },
    { make: 'Toyota', yrsOld: 2, mileage: 41888 },
    { make: 'Tesla', yrsOld: 3, mileage: 57720 }
  ];

  

  let wellDrivenCars = cars.filter((x) => {
    let yearMiles = x.mileage / x.yrsOld
    return(yearMiles < 20000)
  })

  
  
  function carLargeMiles(){
    return wellDrivenCars
  }

  console.log(carLargeMiles())

  let foo = 4
  console.log(foo += 2)
  console.log(foo)
