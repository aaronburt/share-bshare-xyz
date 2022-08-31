# Share BShareX


This is a major refactor of the existing BShareX code base to split the upload/view functionality into two seperate packages.

This allows for the viewing portion to be far more scalable and work-able on serverless platforms like cloud-run without running into upload bottlenecks.

## BShareX

BShareX is a middleware service for S3 to allow users to upload without needing to mess around with S3 credentails for each person.

Currently in VERY early version of production so a lot of features are yet to be added

### Todo List
- [ ] Autogeneration of SXCU file (ShareX custom upload config)
- [ ] Preview info panel sort the data
- [x] Better previews instead of just directly viewing the file. 
- [ ] CNAME support (Multiple domains)
- [ ] Users accounts (OAuth)
- [x] Database for tracking the uploaded content for each user []
- [ ] Metadata api layer to get info from S3
