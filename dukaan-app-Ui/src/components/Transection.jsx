export function Transection() {
    return (
        <div className="flex  flex-col gap-6">
            <div className="text-xl font-medium">
                Transactions | This Month
            </div>
            <div className=" gap-3 flex items-center text-sm text-white">
                <span className="bg-slate-200 text-slate-500 rounded-2xl p-1.5  px-4 ">Payouts (22)</span>
                <span className="bg-blue-600 rounded-2xl p-1.5  px-4 ">Refund (6)</span>

            </div>
        </div>
    )
}