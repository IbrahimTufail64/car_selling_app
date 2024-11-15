import { db } from "../Local_DB/db";

const Photos = [['dashboard','boot','front_seat','back_seat'],
['front_driver','front_passenger','back_driver','back_passenger'],
['surface_marks1','surface_marks2','surface_marks3','surface_marks4'],
['panel_damage1','panel_damage2','panel_damage3','panel_damage4'],
['front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel'],
['front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre'],
['dashboard_lights1','dashboard_lights2','dashboard_lights3','dashboard_lights4'],
['exterior_wear_tear1','exterior_wear_tear2','exterior_wear_tear3','exterior_wear_tear4'],
['glass_health1','glass_health2','glass_health3','glass_health4'],
['damaged_absent_fixtures1','damaged_absent_fixtures2','damaged_absent_fixtures3','damaged_absent_fixtures4'],
['technicals'],
['further_details']]

const PhotoTitle = ['Interior','Exterior','Surface marks','Panel Damage','Wheel Condition','Tyre Condition','Dashboard Lights',
    'Exterior wear & tear','Glass Health','Damaged/Absent Fixtures','Technicals','Further Details'
]

const serviceRecords = ['service_records1','service_records2','service_records3','service_records4']


    
        const retrieve = async (image_to_retrieve:string)=>{ 
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                if(image){
                    return true;
                }
                return false;
            }
            catch(e){
                return false;
            }
        };

        const CalculateState = async () => {
            // Initialize photoTitleObjects as a single object instead of an array of objects
            let photoTitleObjects = PhotoTitle.reduce((acc:any, title) => {
                acc[title] = false;
                return acc;
            }, {});
        
            // Process each photo category and set state accordingly
            for (let i = 0; i < PhotoTitle.length; i++) {
                let State = true;
                for (let j = 0; j < Photos[i].length; j++) {
                    if (!(await retrieve(Photos[i][j]))) {
                        State = false;
                        break; // Exit early if any image is missing
                        
                    }
                    console.log(State)
                }
                photoTitleObjects[PhotoTitle[i]] = State;
            }
        
            // Check if all elements in photoTitleObjects are true
            const everyElementTrue = Object.values(photoTitleObjects).every(state => state === true);
        
            // Check for service records
            let ServiceRecordsState = true;
            for (let j = 0; j < serviceRecords.length; j++) {
                if (!(await retrieve(serviceRecords[j]))) {
                    ServiceRecordsState = false;
                    break; // Exit early if any service record is missing
                }
            }
        
            // Retrieve 'further_details' and 'technicals' and update photoTitleObjects
            const further = await db.images.where('name').equals('further_details').first();
            const technicals = await db.images.where('name').equals('technicals').first();
        
            console.log('Further Details:', further);
            console.log('Technicals:', technicals);
            
        
            if (technicals) {
                photoTitleObjects['Technicals'] = true;
            }
            if (further) {
                photoTitleObjects['Further Details'] = true;
            }
            console.log('photoTitleObjects before updates:', photoTitleObjects);
            return [photoTitleObjects, everyElementTrue, ServiceRecordsState];
        };
        
        export default CalculateState;
        

