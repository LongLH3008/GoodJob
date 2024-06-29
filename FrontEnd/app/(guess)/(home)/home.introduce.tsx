import React from "react";

type Props = {};

const HomeIntroduce = (props: Props) => {
	return (
		<div className="res_layout py-[3%] h-fit">
			<div className="w-full sm:flex sm:justify-center items-center py-[3%]">
				<div className="w-3/4 max-sm:w-full flex flex-col gap-10 items-center h-full">
					<h2 className="text-2xl max-sm:self-start">
						How <span className="text-[#ff9c00]">GoodJob</span> work
					</h2>

					<p className="w-1/2 text-center text-[13px] max-sm:self-start max-xl:w-full max-sm:text-justify">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae autem consequatur
						voluptatibus id, magni veniam maxime eaque, dolorem fugiat aliquid perspiciatis
						deserunt cumque saepe, sapiente at esse ex quas blanditiis!
					</p>

					<ol className="items-start w-full justify-between space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
						<li className="flex items-start text-primary space-x-2.5 rtl:space-x-reverse">
							<span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full shrink-0">
								1
							</span>
							<span>
								<h3 className="font-medium text-[#ff9c00] mb-2 leading-tight">
									Applicant
								</h3>
								<p className="text-[13px] text-wrap">
									Create Cv <br className="max-sm:hidden" /> & provide information
								</p>
							</span>
						</li>
						<li className="flex items-start text-primary space-x-2.5 rtl:space-x-reverse sm:translate-y-10">
							<span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full shrink-0">
								2
							</span>
							<span>
								<h3 className="font-medium text-[#ff9c00] mb-2 leading-tight">
									Employer
								</h3>
								<p className="text-[13px] text-wrap">
									Start recruitment <br className="max-sm:hidden" /> & looking for
									applicant
								</p>
							</span>
						</li>
						<li className="flex items-start text-primary space-x-2.5 rtl:space-x-reverse">
							<span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full shrink-0 ">
								3
							</span>
							<span>
								<h3 className="font-medium text-[#ff9c00] mb-2 leading-tight">
									Connect
								</h3>
								<p className="text-[13px] text-wrap">
									Matching <br className="max-sm:hidden" /> on information provided
								</p>
							</span>
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default HomeIntroduce;
