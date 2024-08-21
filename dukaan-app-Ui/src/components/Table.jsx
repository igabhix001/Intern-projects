import { TableAbove } from "./Tableabove";
import { orderData } from "./data";
export function Table() {
    return (
        <div className="h-auto shadow-md rounded-lg px-3 pt-3 pb-2 grid gap-4  ">
            <TableAbove />
            <div className="relative-overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="uppercase text-sm rounded font-medium text-slate-800">
                        <tr >
                            <th scope="col" className=" px-6 py-3 font-medium">ORDER ID</th>
                            <th scope="col" className="px-6 py-3 font-medium">STATUS</th>
                            <th scope="col" className="px-6 py-3 font-medium">TRANSECTION ID</th>
                            <th scope="col" className="px-6 py-3 font-medium">REFUND DATE</th>
                            <th scope="col" className="px-6 py-3 text-right font-medium">ORDER AMOUNT</th>
                        </tr>
                    </thead>
                    {orderData.map((order) => {
                        return (
                            <tbody className="">
                                <tr className="border-b  ">
                                    <th scope="row" className="px-6 font-medium py-4 text-blue-600">
                                        #{order.id}
                                    </th>
                                    <td className="px-4 flex gap-2 py-4 items-center ">
                                        {(order.status === "Successful") && <div className=" rounded-full h-2.5 w-2.5 bg-green-500" />}
                                        {(order.status === "Processing") && <div className=" rounded-full h-2.5 w-2.5 bg-slate-800"/>}
                                        {(order.status === "Failed") && <div className=" rounded-full h-2.5 w-2.5 bg-red-500"/>}
                                        {order.status}
                                    </td>
                                    <td  className="px-6">
                                        {order.transactionID}
                                    </td>
                                    <td  className="px-6">
                                        {order.refundDate}
                                    </td>
                                    <td className="text-right pr-8">
                                        {order.amount}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}