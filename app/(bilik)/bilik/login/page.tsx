import { getAllBilik } from "@/action/bilik/get-all";
import { BilikLoginForm } from "@/components/domain/bilik/form/bilik-login-form";

export default async function BilikLogin() {
    const bilikList = await getAllBilik();

    return (
        <div className="h-screen flex items-center justify-center ">
            <BilikLoginForm
                bilikList={bilikList.success ? bilikList.data : []}
            />
        </div>
    );
}
