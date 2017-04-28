class Gestiones::FinanzasController < ApplicationController

  def index



    @data = {
        labels: ["3", "4", "9", "10", "12", "16", "19"],
        datasets: [
            {
                label: "Pagos por dias",
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                data: [650000, 590000, 800000, 810000, 560000, 550000, 400000]
            }
        ]
    }
    @options = {:height=> 150}
  end

end
