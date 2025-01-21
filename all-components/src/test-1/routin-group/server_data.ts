export const serverDataModels = [
    'CP-3905',
    'CP-6901',
    'CP-6911',
    'CP-6921',
    'CP-6941',
]
export const serverDataVendors: string[] = [
    'Aastra',
    'Cisco',
    'D-Link',
    'Fanvil',
    'YealinkX',
]

export const serverDataProps: any = {
    outputs: 3,
    propertyType: 'model',
    propertyList: [
        {index: 123123123123, valueList: ['CP-3905']},
        {index: 123123156723, valueList: ['CP-6901', 'CP-6941']}
    ]
}


// export const serverLogic = () => {
//
//     const _testPropertyType = 'model'
//     const testPropertyList = ['test1', 'test2', 'Default']
//     const _testInputData = [
//         {
//             ctx: {
//                 device_ctx: {
//                     test_1: 'none',
//                     test_2: 'none',
//                     test_3: 'none',
//                     model: 'test1',
//                     vendor: 'test1',
//                 }
//             }
//         },
//         {
//             ctx: {
//                 device_ctx: {
//                     test_1: 'none',
//                     test_2: 'none',
//                     test_3: 'none',
//                     model: 'test2',
//                     vendor: 'test2',
//                 }
//             }
//         },
//         {
//             ctx: {
//                 device_ctx: {
//                     test_1: 'none',
//                     test_2: 'none',
//                     test_3: 'none',
//                     model: 'test9',
//                     vendor: 'test9',
//                 }
//             }
//         },
//         {
//             ctx: {
//                 device_ctx: {
//                     test_1: 'none',
//                     test_2: 'none',
//                     test_3: 'none',
//                     model: null,
//                     vendor: null,
//                 }
//             }
//         },
//     ]
//
//
//     /** logic=======================================*/
//     _testInputData.forEach((itemInputData: any): void => {
//         const elementProperty = itemInputData.ctx.device_ctx[_testPropertyType]
//         let indexPort = testPropertyList.indexOf(elementProperty)
//         if (indexPort === -1) indexPort = testPropertyList.length - 1
//         let arrayForImport: any[] = testPropertyList.map((_item: string) => null)
//         arrayForImport[indexPort] = {
//             _msgid: "",
//             payload: itemInputData
//         }
//
//         console.log(arrayForImport)
//     })
// }
