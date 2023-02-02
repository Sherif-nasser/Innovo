from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in innovo/__init__.py
from innovo import __version__ as version

setup(
	name="innovo",
	version=version,
	description="innovo",
	author="sherif",
	author_email="sheriffnasser@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
