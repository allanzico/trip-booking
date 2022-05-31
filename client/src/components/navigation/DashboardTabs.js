import React from "react";

const DashboardTabs = () => {

  return (
<div class="container mx-auto">
    <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="sticky top-0 p-4 w-full">
              
                <ul class="flex flex-col overflow-hidden">
                    ...
                </ul>
            </div>
        </aside>
        <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            
        </main>
    </div>
</div>

      
  );
};

export default DashboardTabs;
